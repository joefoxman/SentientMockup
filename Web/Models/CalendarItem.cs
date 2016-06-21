using System;
using System.ComponentModel;

namespace POC.Models
{
    public class CalendarItem
    {
        public bool Disabled { get; set; }
        [DisplayName("Status")]
        public string Status { get; set; }
        [DisplayName("Title")]
        public string Title { get; set; }
        [DisplayName("Start")]
        public DateTime StartDateTime { get; set; }
        [DisplayName("End")]
        public DateTime EndDateTime { get; set; }
        [DisplayName("All Day Event")]
        public bool AllDayEvent { get; set; }
        [DisplayName("Description")]
        public string Description { get; set; }
        // 1-IOM, 2-DBS
        public int BusinessLineId { get; set; }
        [DisplayName("Physician")]
        public string PhysicianName { get; set; }
        [DisplayName("SNP")]
        public string SnpName { get; set; }
        public int CaseId { get; set; }
    }
}