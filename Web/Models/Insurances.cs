using System;
using System.Collections.Generic;

namespace POC.Models
{
    public class Insurances
    {
        public List<Insurance> InsuranceList { get; set; }
        public bool AutoAccident { get; set; }
        public bool WorkersComp { get; set; }
        public DateTime? DateOfInjury { get; set; }
        public string PreAuth { get; set; }
        public string Guarantor { get; set; }
    }
}