using AutoMapper;
using HealthBuddy.Server.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthBuddy.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExerciseController : ControllerBase
    {
        private readonly IExerciseRepository _IExerciseRepository;
        private readonly IMapper _mapper;

        public ExerciseController(IExerciseRepository exerciseRepository, IMapper mapper)
        {
            _IExerciseRepository = exerciseRepository;
            _mapper = mapper;
        }


    }
}
