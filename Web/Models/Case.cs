using System;
using System.ComponentModel;

namespace POC.Models
{
    public class Case
    {
        public Patient Patient { get; set; }
        public Insurances Insurances { get; set; }
        public Hardware Hardware { get; set; }
        public Hospital Hospital { get; set; }

        [DisplayName("Case Number")]
        public string CaseNumber { get; set; }

        [DisplayName("Date Of Service")]
        public DateTime DateOfService { get; set; }

        [DisplayName("Surgeon")]
        public string Surgeon { get; set; }

        [DisplayName("Staff Neurologist")]
        public string StaffNeurologist { get; set; }

        [DisplayName("Procedure")]
        public string Procedure { get; set; }

        [DisplayName("Diagnosis")]
        public string Diagnosis { get; set; }

    }
}