using System;

namespace POC.Models
{
    public class CaseSearchResult
    {
        public string CaseNumber { get; set; }
        public DateTime DateOfService { get; set; }
        public string Surgeon { get; set; }
        public Patient Patient { get; set; }
        public string StaffNeurologist { get; set; }
    }
}