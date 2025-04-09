using AutoMapper;
using HealthBuddy.Server.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthBuddy.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealController : ControllerBase
    {
        private readonly IMealScheduleRepository _mealScheduleRepository;

        private readonly IMealDetailRepository _mealDetailRepository;

        private readonly IMapper _mapper;

        public MealController(IMealScheduleRepository mealScheduleRepository, IMealDetailRepository mealDetailRepository, IMapper mapper)
        {
            _mealScheduleRepository = mealScheduleRepository;
            _mealDetailRepository = mealDetailRepository;
            _mapper = mapper;
        }


    }
}
