using AutoMapper;
using HealthBuddy.Server.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

        public ScheduleController(IWorkoutScheduleRepository workoutScheduleRepository,
            IMealScheduleRepository mealScheduleRepository, IWorkoutDetailRepository workoutDetailRepository,
            IMealDetailRepository mealDetailRepository, IUserWorkoutScheduleRepository userWorkoutScheduleRepository,
            IUserMealScheduleRepository userMealScheduleRepository, IUserWorkoutTrackingRepository userWorkoutTrackingRepository,
            IUserMealTrackingRepository userMealTrackingRepository, IMapper mapper)
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
        }


    }
}
