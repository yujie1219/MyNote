using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MyNote.Api.Repositories.Interfaces;
using MyNote.Api.Utils;

namespace MyNote.Api.Controllers
{
    [Route("api/learnEN")]
    [ApiController]
    public class VocabularyController : Controller
    {
        private readonly IVocabularyRepository vocabularyRepository;
        private readonly ILogger logger;

        public VocabularyController(IVocabularyRepository vocabularyRepository, ILogger<VocabularyController> logger)
        {
            this.vocabularyRepository = vocabularyRepository;
            this.logger = logger;
        }

        [HttpGet("vocabulary")]
        public CommonResponse GetVocabularies()
        {
            return ApiResponse.Ok(this.vocabularyRepository.GetAllVocabularies());
        }

        [HttpPost("vocabulary")]
        public CommonResponse AddVocabulary(string word)
        {
            return ApiResponse.Ok(this.vocabularyRepository.AddVocabulary(word));
        }

        [HttpDelete("vocabulary")]
        public CommonResponse RemoveVocabulary(string word)
        {
            return ApiResponse.Ok(this.vocabularyRepository.RemoveVocabulary(word));
        }
    }
}
