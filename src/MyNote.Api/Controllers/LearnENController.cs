using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MyNote.Api.Models;
using MyNote.Api.Repositories.Interfaces;
using MyNote.Api.Utils;
using System.ComponentModel.DataAnnotations;

namespace MyNote.Api.Controllers
{
    [Route("api/learnEN")]
    [ApiController]
    public class LearnENController : Controller
    {
        private readonly IVocabularyRepository vocabularyRepository;
        private readonly IVocabularyTypeRepository vocabularyTypeRepository;
        private readonly ILogger logger;

        public LearnENController(IVocabularyRepository vocabularyRepository, IVocabularyTypeRepository vocabularyTypeRepository, ILogger<LearnENController> logger)
        {
            this.vocabularyRepository = vocabularyRepository;
            this.vocabularyTypeRepository = vocabularyTypeRepository;
            this.logger = logger;
        }

        [HttpGet("vocabulary")]
        public CommonResponse GetVocabularies()
        {
            return ApiResponse.Ok(this.vocabularyRepository.GetAllVocabularies());
        }

        [HttpPost("vocabulary")]
        public CommonResponse AddVocabulary([Required] string word)
        {
            return ApiResponse.Ok(this.vocabularyRepository.AddVocabulary(word));
        }

        [HttpDelete("vocabulary")]
        public CommonResponse RemoveVocabulary([Required] string word)
        {
            return ApiResponse.Ok(this.vocabularyRepository.RemoveVocabulary(word));
        }

        [HttpGet("vocabularyType")]
        public CommonResponse GetVocabularyTypes([Required] string word)
        {
            return ApiResponse.Ok(this.vocabularyTypeRepository.GetVocabularyTypes(word));
        }

        [HttpPost("vocabularyType")]
        public CommonResponse AddVocabularyType([Required] string word, [Required] VocabularyType vocabularyType)
        {
            return ApiResponse.Ok(this.vocabularyTypeRepository.AddVocabularyType(word, vocabularyType));
        }

        [HttpDelete("vocabularyType")]
        public CommonResponse RemoveVocabularyType([Required] string word, [Required] string translation)
        {
            return ApiResponse.Ok(this.vocabularyTypeRepository.RemoveVocabularyType(word, translation));
        }

        [HttpPost("Example")]
        public CommonResponse AddExample([Required] string word, [Required] string translation, [Required] Example example)
        {
            return ApiResponse.Ok(this.vocabularyTypeRepository.AddExample(word, translation, example));
        }

        [HttpDelete("Example")]
        public CommonResponse RemoveExample([Required] string word, [Required] string translation, [Required] string exampleID)
        {
            return ApiResponse.Ok(this.vocabularyTypeRepository.RemoveExample(word, translation, exampleID));
        }
    }
}
