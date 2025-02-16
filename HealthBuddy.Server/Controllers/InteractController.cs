using AutoMapper;
using HealthBuddy.Server.Models.Domain;
using HealthBuddy.Server.Models.DTO.ADD;
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

        private readonly ILikeRepository _likeRepository;

        private readonly ICommentRepository _commentRepository;

        private readonly IReportRepository _reportRepository;
        private readonly IMapper _mapper;

        public InteractController(IUserRepository userRepository,
        ILikeRepository likeRepository,
        ICommentRepository commentRepository,
        IReportRepository reportRepository,
         IMapper mapper)
        {
            _userRepository = userRepository;
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
                return Ok("Like removed successfully");
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error removing data from the database " + e.Message);
            }
        }

        #endregion
    }
}
