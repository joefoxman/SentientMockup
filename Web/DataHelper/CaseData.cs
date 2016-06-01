using System;
using System.Collections.Generic;
using POC.Models;

namespace POC.DataHelper
{
    public static class CaseData
    {
        public static Case GetCaseData()
        {
            var insurances = new List<Insurance> {
                new Insurance {GroupNumber = "111", Name = "Etna", Order = 1, PolicyNumber = "2222"}
            };
            var caseViewModel = new Case
            {
                CaseNumber = "11111",
                DateOfService = new DateTime(2015, 4, 3),
                Diagnosis = "Diagnosis",
                Hardware = new Hardware { Amplifier = "111", BaseUnit = "111", ConnectionType = 1, Laptop = "111", MotorBox = "111", StimBox = "111" },
                Hospital = new Hospital { ArrivalNote = "Watch out for the nurses station", BiomedCheck = false, ConnectionDetails = "Poor", DeskContact = "Jamie Fox", DoorCode = "333", ParkingInfo = "Park in the lot and get a ticket", RoomType = "OP", ScrubColor = "Orange/Blue/Green" },
                Patient = new Patient { DateOfBirth = new DateTime(1980, 4, 3), FirstName = "Bob", LastName = "Patient", Gender = "M" },
                StaffNeurologist = "Neurologist 1",
                Surgeon = "Surgeon 2",
                Procedure = "Procedures Here",
                Insurances = new Insurances { AutoAccident = false, InsuranceList = insurances, PreAuth = "ddd", WorkersComp = false }
            };
            return caseViewModel;
        }
        public static CaseSearchResults GetCaseListData()
        {
            var caseData = new CaseSearchResults();
            var results = new List<CaseSearchResult>
            {
                new CaseSearchResult
                {
                    DateOfService = new DateTime(2015, 4, 5),
                    CaseNumber = "1111",
                    Patient = new Patient {FirstName = "Jane", LastName = "Doe", Id = Guid.NewGuid(), Gender = "F"},
                    StaffNeurologist = "Dr. 1",
                    Surgeon = "Surgeon 1"
                },
                                new CaseSearchResult
                {
                    DateOfService = new DateTime(2015, 3, 16),
                    CaseNumber = "2222",
                    Patient = new Patient {FirstName = "Jack", LastName = "Grant", Id = Guid.NewGuid(), Gender = "M"},
                    StaffNeurologist = "Dr. 3",
                    Surgeon = "Surgeon 4"
                }
            };
            caseData.Results = results;
            return caseData;
        }
    }
}