namespace POC.Models
{
    public class Hardware
    {
        public string Laptop { get; set; }
        public string BaseUnit { get; set; }
        public string Amplifier { get; set; }
        public string StimBox { get; set; }
        public string MotorBox { get; set; }
        // 0-None, 1-LAN, 2-Wireless, 3-Broadband Card
        public int ConnectionType { get; set; }
    }
}