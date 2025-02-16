using AutoMapper;
using HealthBuddy.Server.Models.Domain;
using HealthBuddy.Server.Models.DTO.ADD;
using HealthBuddy.Server.Models.DTO.GET;
using HealthBuddy.Server.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthBuddy.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InteractController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        private readonly IFoodRepository _foodRepository;

        private readonly IExerciseRepository _exerciseRepository;

        private readonly ILikeRepository _likeRepository;

        private readonly ICommentRepository _commentRepository;

        private readonly IReportRepository _reportRepository;
        private readonly IMapper _mapper;

        public InteractController(IUserRepository userRepository,
        IFoodRepository foodRepository,
        IExerciseRepository exerciseRepository,
        ILikeRepository likeRepository,
        ICommentRepository commentRepository,
        IReportRepository reportRepository,
         IMapper mapper)
        {
            _userRepository = userRepository;
            _foodRepository = foodRepository;
            _exerciseRepository = exerciseRepository;
            _likeRepository = likeRepository;
            _commentRepository = commentRepository;
            _reportRepository = reportRepository;
            _mapper = mapper;
        }

        #region like
        [HttpGet("GetPostLikeByUserId")]
        public async Task<IActionResult> GetPostLikeByUserId(AddLikeRequestDTO requestDTO)
        {
            try
            {
                var like = await _likeRepository.GetPostLikeByUserId(requestDTO.TargetId, requestDTO.UserId, requestDTO.TargetType);
                return Ok(like);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database " + e.Message);
            }
        }

        [HttpPost("like")]
        public async Task<IActionResult> Like(AddLikeRequestDTO requestDTO)
        {
            try
            {
                var likeDomain = _mapper.Map<Like>(requestDTO);
                if (await _likeRepository.GetPostLikeByUserId(likeDomain.TargetId, likeDomain.UserId, likeDomain.TargetType))
                {
                    return BadRequest("You have already liked this post");
                }
                await _likeRepository.CreateAsync(likeDomain);
                if (likeDomain.TargetType == "food")
                {
                    await _foodRepository.UpdateFoodLikes(requestDTO.TargetId, 1);
                }
                else if (likeDomain.TargetType == "exercise")
                {
                    await _exerciseRepository.UpdateExerciseLikes(requestDTO.TargetId, 1);
                }
                return Ok("Like added successfully");
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error adding data to the database " + e.Message);
            }
        }

        [HttpDelete("unlike")]
        public async Task<IActionResult> Unlike(AddLikeRequestDTO requestDTO)
        {
            try
            {
                var likeDomain = _mapper.Map<Like>(requestDTO);
                await _likeRepository.DeleteAsync(l => l.TargetId == likeDomain.TargetId && l.UserId == likeDomain.UserId && l.TargetType == likeDomain.TargetType);
                if (likeDomain.TargetType == "food")
                {
                    await _foodRepository.UpdateFoodLikes(requestDTO.TargetId, -1);
                }
                else if (likeDomain.TargetType == "exercise")
                {
                    await _exerciseRepository.UpdateExerciseLikes(requestDTO.TargetId, -1);
                }
                return Ok("Like removed successfully");
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error removing data from the database " + e.Message);
            }
        }

        #endregion

        #region comment
        [HttpGet("GetPostComments")]
        public async Task<IActionResult> GetPostComments(int postId, string postType)
        {
            try
            {
                var comments = await _commentRepository.GetCommentsByPostId(postId, postType);
                return Ok(_mapper.Map<List<CommentDTO>>(comments));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database " + e.Message);
            }
        }

        [HttpPost("comment")]
        public async Task<IActionResult> Comment(AddCommentRequestDTO requestDTO)
        {
            try
            {
                var commentDomain = _mapper.Map<Comment>(requestDTO);
                commentDomain.CreatedDate = DateTime.Now;
                await _commentRepository.CreateAsync(commentDomain);
                if (commentDomain.TargetType == "food")
                {
                    await _foodRepository.UpdateFoodComments(requestDTO.TargetId, 1);
                }
                else if (commentDomain.TargetType == "exercise")
                {
                    await _exerciseRepository.UpdateExerciseComments(requestDTO.TargetId, 1);
                }
                return Ok("Comment added successfully");
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error adding data to the database " + e.Message);
            }
        }

        [HttpDelete("deleteComment")]
        public async Task<IActionResult> DeleteComment(int commentId, string postType)
        {
            try
            {
                await _commentRepository.DeleteAsync(c => c.CommentId == commentId);
                if (postType == "food")
                {
                    await _foodRepository.UpdateFoodComments(commentId, -1);
                }
                else if (postType == "exercise")
                {
                    await _exerciseRepository.UpdateExerciseComments(commentId, -1);
                }
                return Ok("Comment removed successfully");
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error removing data from the database " + e.Message);
            }
        }
        #endregion
    }
}
