using AutoMapper;
using HealthBuddy.Server.Models.DTO.GET;
using HealthBuddy.Server.Models.DTO.UPDATE;
using HealthBuddy.Server.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using HealthBuddy.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace HealthBuddy.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly IWorkoutScheduleRepository _workoutScheduleRepository;

        private readonly IMealScheduleRepository _mealScheduleRepository;

        private readonly IWorkoutDetailRepository _workoutDetailRepository;

        private readonly IMealDetailRepository _mealDetailRepository;

        private readonly IUserWorkoutScheduleRepository _userWorkoutScheduleRepository;

        private readonly IUserMealScheduleRepository _userMealScheduleRepository;

        private readonly IUserWorkoutTrackingRepository _userWorkoutTrackingRepository;

        private readonly IUserMealTrackingRepository _userMealTrackingRepository;

        private readonly IMapper _mapper;
        private readonly HealthBuddyDbContext _dbContext;

        public ScheduleController(IWorkoutScheduleRepository workoutScheduleRepository,
            IMealScheduleRepository mealScheduleRepository, IWorkoutDetailRepository workoutDetailRepository,
            IMealDetailRepository mealDetailRepository, IUserWorkoutScheduleRepository userWorkoutScheduleRepository,
            IUserMealScheduleRepository userMealScheduleRepository, IUserWorkoutTrackingRepository userWorkoutTrackingRepository,
            IUserMealTrackingRepository userMealTrackingRepository, IMapper mapper, HealthBuddyDbContext dbContext)
        {
            _workoutScheduleRepository = workoutScheduleRepository;
            _mealScheduleRepository = mealScheduleRepository;
            _workoutDetailRepository = workoutDetailRepository;
            _mealDetailRepository = mealDetailRepository;
            _userWorkoutScheduleRepository = userWorkoutScheduleRepository;
            _userMealScheduleRepository = userMealScheduleRepository;
            _userWorkoutTrackingRepository = userWorkoutTrackingRepository;
            _userMealTrackingRepository = userMealTrackingRepository;
            _mapper = mapper;
            _dbContext = dbContext;
        }

        [HttpGet("GetAllSchedules")]
        public async Task<ActionResult> GetAllSchedules()
        {
            try
            {
                var workoutScheduleTask = _workoutScheduleRepository.GetApprovedWorkoutSchedules();
                var mealScheduleTask = _mealScheduleRepository.GetApprovedMealSchedules();

                await Task.WhenAll(workoutScheduleTask, mealScheduleTask);

                // Lấy kết quả từ các task
                var workoutSchedules = await workoutScheduleTask;
                var mealSchedules = await mealScheduleTask;

                // Map từ Food và Exercise sang PostDTO
                var workoutSchedulePosts = _mapper.Map<List<PostDTO>>(workoutSchedules);
                var mealSchedulePosts = _mapper.Map<List<PostDTO>>(mealSchedules);

                // Gán loại bài post (food hoặc exercise)
                foreach (var post in workoutSchedulePosts)
                {
                    post.PostType = "workout";
                }

                foreach (var post in mealSchedulePosts)
                {
                    post.PostType = "meal";
                }

                // Gộp cả hai danh sách lại
                var allPosts = new List<PostDTO>();
                allPosts.AddRange(workoutSchedulePosts);
                allPosts.AddRange(mealSchedulePosts);

                return Ok(allPosts.OrderByDescending(p => p.CreatedDate));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database:" + e.Message);
            }
        }

        [HttpGet("GetUserTrackingSchedules/{userId}")]
        public async Task<ActionResult> GetUserTrackingSchedules(int userId)
        {
            try
            {
                var userMealTrackingTask = _mealScheduleRepository.GetUserTrackingMealSchedules(userId);
                var userWorkoutTrackingTask = _workoutScheduleRepository.GetUserTrackingWorkoutSchedules(userId);

                await Task.WhenAll(userMealTrackingTask, userWorkoutTrackingTask);

                // Lấy kết quả từ các task
                var userMealSchedules = await userMealTrackingTask;
                var userWorkoutSchedules = await userWorkoutTrackingTask;

                // Map sang PostDTO
                var mealSchedulePosts = _mapper.Map<List<PostDTO>>(userMealSchedules);
                var workoutSchedulePosts = _mapper.Map<List<PostDTO>>(userWorkoutSchedules);

                // Gán loại bài post
                foreach (var post in mealSchedulePosts)
                {
                    post.PostType = "meal";
                }

                foreach (var post in workoutSchedulePosts)
                {
                    post.PostType = "workout";
                }

                // Gộp cả hai danh sách lại
                var allTrackingPosts = new List<PostDTO>();
                allTrackingPosts.AddRange(mealSchedulePosts);
                allTrackingPosts.AddRange(workoutSchedulePosts);

                return Ok(allTrackingPosts.OrderByDescending(p => p.CreatedDate));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving user tracking schedules: " + e.Message);
            }
        }

        [HttpGet("GetUserScheduleTrackingDetail/{userId}/{scheduleId}/{scheduleType}")]
        public async Task<ActionResult> GetUserScheduleTrackingDetail(int userId, int scheduleId, string scheduleType)
        {
            try
            {
                if (scheduleType.ToLower() == "meal")
                {
                    // Lấy meal tracking và schedule details
                    var mealTracking = await _userMealTrackingRepository.GetUserMealTrackingByUserAndScheduleId(userId, scheduleId);
                    if (mealTracking == null)
                    {
                        return NotFound("User is not tracking this meal schedule");
                    }

                    var mealScheduleDays = await _userMealScheduleRepository.GetUserMealSchedulesByUserAndScheduleId(userId, scheduleId);

                    // Lấy chi tiết món ăn cho từng ngày
                    var mealDetails = await _dbContext.MealDetails
                        .Include(md => md.Food)
                        .Where(md => md.MealScheduleId == scheduleId)
                        .ToListAsync();

                    var result = new UserScheduleTrackingDetailDTO
                    {
                        ScheduleId = mealTracking.MealSchedule.MealScheduleId,
                        ScheduleName = mealTracking.MealSchedule.MealName,
                        Description = mealTracking.MealSchedule.Description,
                        ImgUrl = mealTracking.MealSchedule.ImgUrl,
                        TotalDays = mealTracking.MealSchedule.TotalDays,
                        StartDate = mealTracking.StartDate,
                        TrackingDate = mealTracking.TrackingDate,
                        ScheduleType = "meal",
                        Uploader = _mapper.Map<UserDTO>(mealTracking.MealSchedule.Uploader),
                        Days = mealScheduleDays.Select(day => new UserScheduleDayDTO
                        {
                            DayNumber = day.DayNumber,
                            IsCompleted = day.IsCompleted,
                            CompletionDate = day.CompletionDate,
                            ExpectedDate = mealTracking.StartDate.AddDays(day.DayNumber - 1),
                            CanComplete = DateTime.Now.Date >= mealTracking.StartDate.AddDays(day.DayNumber - 1).Date && !day.IsCompleted,
                            Items = mealDetails
                                .Where(md => md.DayNumber == day.DayNumber)
                                .Select(md => new DayItemDTO
                                {
                                    ItemId = md.Food.FoodId,
                                    ItemName = md.Food.FoodName,
                                    ItemImage = md.Food.ImgUrl,
                                    ItemType = "food"
                                }).ToList()
                        }).ToList()
                    };

                    return Ok(result);
                }
                else if (scheduleType.ToLower() == "workout")
                {
                    // Lấy workout tracking và schedule details
                    var workoutTracking = await _userWorkoutTrackingRepository.GetUserWorkoutTrackingByUserAndScheduleId(userId, scheduleId);
                    if (workoutTracking == null)
                    {
                        return NotFound("User is not tracking this workout schedule");
                    }

                    var workoutScheduleDays = await _userWorkoutScheduleRepository.GetUserWorkoutSchedulesByUserAndScheduleId(userId, scheduleId);

                    // Lấy chi tiết exercise cho từng ngày
                    var workoutDetails = await _dbContext.WorkoutDetails
                        .Include(wd => wd.Exercise)
                        .Where(wd => wd.WorkoutScheduleId == scheduleId)
                        .ToListAsync();

                    var result = new UserScheduleTrackingDetailDTO
                    {
                        ScheduleId = workoutTracking.WorkoutSchedule.WorkoutScheduleId,
                        ScheduleName = workoutTracking.WorkoutSchedule.WorkOutName,
                        Description = workoutTracking.WorkoutSchedule.Description,
                        ImgUrl = workoutTracking.WorkoutSchedule.ImgUrl,
                        TotalDays = workoutTracking.WorkoutSchedule.TotalDays,
                        StartDate = workoutTracking.StartDate,
                        TrackingDate = workoutTracking.TrackingDate,
                        ScheduleType = "workout",
                        Uploader = _mapper.Map<UserDTO>(workoutTracking.WorkoutSchedule.Uploader),
                        Days = workoutScheduleDays.Select(day => new UserScheduleDayDTO
                        {
                            DayNumber = day.DayNumber,
                            IsCompleted = day.IsCompleted,
                            CompletionDate = day.CompletionDate,
                            ExpectedDate = workoutTracking.StartDate.AddDays(day.DayNumber - 1),
                            CanComplete = DateTime.Now.Date >= workoutTracking.StartDate.AddDays(day.DayNumber - 1).Date && !day.IsCompleted,
                            Items = workoutDetails
                                .Where(wd => wd.DayNumber == day.DayNumber)
                                .Select(wd => new DayItemDTO
                                {
                                    ItemId = wd.Exercise.ExerciseId,
                                    ItemName = wd.Exercise.ExerciseName,
                                    ItemImage = wd.Exercise.ImgUrl,
                                    ItemType = "exercise"
                                }).ToList()
                        }).ToList()
                    };

                    return Ok(result);
                }
                else
                {
                    return BadRequest("Invalid schedule type. Must be 'meal' or 'workout'");
                }
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving schedule tracking detail: " + e.Message);
            }
        }

        [HttpPost("CompleteDay")]
        public async Task<ActionResult> CompleteDay(CompleteDayRequestDTO requestDTO)
        {
            try
            {
                if (requestDTO.ScheduleType.ToLower() == "meal")
                {
                    // Lấy meal schedule day
                    var mealScheduleDay = await _userMealScheduleRepository.GetUserMealScheduleByUserScheduleAndDay(
                        requestDTO.UserId, requestDTO.ScheduleId, requestDTO.DayNumber);

                    if (mealScheduleDay == null)
                    {
                        return NotFound("Meal schedule day not found");
                    }

                    if (mealScheduleDay.IsCompleted)
                    {
                        return BadRequest("This day is already completed");
                    }

                    // Lấy tracking để check ngày có thể complete không
                    var mealTracking = await _userMealTrackingRepository.GetUserMealTrackingByUserAndScheduleId(requestDTO.UserId, requestDTO.ScheduleId);
                    if (mealTracking == null)
                    {
                        return NotFound("User meal tracking not found");
                    }

                    var expectedDate = mealTracking.StartDate.AddDays(requestDTO.DayNumber - 1);
                    if (DateTime.Now.Date < expectedDate.Date)
                    {
                        return BadRequest($"Cannot complete day {requestDTO.DayNumber}. Expected date is {expectedDate:yyyy-MM-dd}");
                    }

                    // Cập nhật completion
                    mealScheduleDay.IsCompleted = true;
                    mealScheduleDay.CompletionDate = DateTime.Now;
                    await _userMealScheduleRepository.UpdateAsync(
                        ums => ums.UserMealScheduleId == mealScheduleDay.UserMealScheduleId,
                        ums => {
                            ums.IsCompleted = true;
                            ums.CompletionDate = DateTime.Now;
                        });

                    // Cập nhật tracking date
                    await _userMealTrackingRepository.UpdateAsync(
                        umt => umt.UserMealTrackingId == mealTracking.UserMealTrackingId,
                        umt => {
                            umt.TrackingDate = DateTime.Now;
                        });

                    return Ok(new { Message = $"Day {requestDTO.DayNumber} completed successfully" });
                }
                else if (requestDTO.ScheduleType.ToLower() == "workout")
                {
                    // Lấy workout schedule day
                    var workoutScheduleDay = await _userWorkoutScheduleRepository.GetUserWorkoutScheduleByUserScheduleAndDay(
                        requestDTO.UserId, requestDTO.ScheduleId, requestDTO.DayNumber);

                    if (workoutScheduleDay == null)
                    {
                        return NotFound("Workout schedule day not found");
                    }

                    if (workoutScheduleDay.IsCompleted)
                    {
                        return BadRequest("This day is already completed");
                    }

                    // Lấy tracking để check ngày có thể complete không
                    var workoutTracking = await _userWorkoutTrackingRepository.GetUserWorkoutTrackingByUserAndScheduleId(requestDTO.UserId, requestDTO.ScheduleId);
                    if (workoutTracking == null)
                    {
                        return NotFound("User workout tracking not found");
                    }

                    var expectedDate = workoutTracking.StartDate.AddDays(requestDTO.DayNumber - 1);
                    if (DateTime.Now.Date < expectedDate.Date)
                    {
                        return BadRequest($"Cannot complete day {requestDTO.DayNumber}. Expected date is {expectedDate:yyyy-MM-dd}");
                    }

                    // Cập nhật completion
                    workoutScheduleDay.IsCompleted = true;
                    workoutScheduleDay.CompletionDate = DateTime.Now;
                    await _userWorkoutScheduleRepository.UpdateAsync(
                        uws => uws.UserWorkoutScheduleId == workoutScheduleDay.UserWorkoutScheduleId,
                        uws => {
                            uws.IsCompleted = true;
                            uws.CompletionDate = DateTime.Now;
                        });

                    // Cập nhật tracking date
                    await _userWorkoutTrackingRepository.UpdateAsync(
                        uwt => uwt.UserWorkoutTrackingId == workoutTracking.UserWorkoutTrackingId,
                        uwt => {
                            uwt.TrackingDate = DateTime.Now;
                        });

                    return Ok(new { Message = $"Day {requestDTO.DayNumber} completed successfully" });
                }
                else
                {
                    return BadRequest("Invalid schedule type. Must be 'meal' or 'workout'");
                }
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error completing day: " + e.Message);
            }
        }


    }
}
