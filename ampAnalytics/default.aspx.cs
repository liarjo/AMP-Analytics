using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ampAnalytics
{
    public partial class _default : System.Web.UI.Page
    {
        protected string _TrackingID;
        protected string _videoManifest;
        protected void Page_Load(object sender, EventArgs e)
        {
            _TrackingID = System.Configuration.ConfigurationManager.AppSettings["TrackingID"];
            _videoManifest = System.Configuration.ConfigurationManager.AppSettings["videoManifest"];
        }
    }
}