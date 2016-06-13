using Newtonsoft.Json;

namespace POC.Models
{
    public class ScheduleItem
    {
        [JsonProperty("text")]
        public string Text { get; set; }
        [JsonProperty("start_date")]
        public string StartDate { get; set; }
        [JsonProperty("end_date")]
        public string EndDate { get; set; }
    }
}