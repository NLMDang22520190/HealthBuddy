using AutoMapper;
using HealthBuddy.Server.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthBuddy.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutController : ControllerBase
    {
        private readonly IWorkoutScheduleRepository _workoutScheduleRepository;

        private readonly IWorkoutDetailRepository _workoutDetailRepository;
        private readonly IMapper _mapper;

        public WorkoutController(IWorkoutScheduleRepository workoutScheduleRepository, IWorkoutDetailRepository workoutDetailRepository, IMapper mapper)
        {
            _workoutScheduleRepository = workoutScheduleRepository;
            _workoutDetailRepository = workoutDetailRepository;
            _mapper = mapper;
        }


    }
}
