﻿using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Runtime.Serialization;

namespace LegenDiary.Models
{
    [DataContract]
    public partial class Widget
    {
        [DataMember]
        public int WidgetId { get; set; }
        public DateTimeOffset? WidgetDate { get; set; }
        [DataMember]
        public string Title { get; set; }
        [DataMember]
        public string Subtitle { get; set; }
        [DataMember]
        public bool? IsFavourite { get; set; }
        [DataMember]
        public string WidgetData { get; set; }
        [DataMember]
        public int WidgetTypeId { get; set; }
        [DataMember]
        public int AppuserId { get; set; }

        public Appuser Appuser { get; set; }
        public WidgetType WidgetType { get; set; }



        public Response Save(IConfiguration config)
        {
            bool success = false;
            string message = string.Empty;

            using (SqlConnection cn = new SqlConnection(config.GetConnectionString("AppDbContext")))
            {
                try
                {
                    cn.Open();

                    SqlCommand cmd = new SqlCommand();
                    cmd.Connection = cn;
                    cmd.CommandText = @"INSERT INTO [WIDGET] (WIDGET_DATE, [TITLE], [SUBTITLE], [WIDGET_DATA], [WIDGET_TYPE_ID], [APPUSER_ID]) 
                                        VALUES (@WIDGET_DATE, @TITLE, @SUBTITLE, @WIDGET_DATA, @WIDGET_TYPE_ID, @APPUSER_ID) ";
                    cmd.Parameters.Add("@TITLE", System.Data.SqlDbType.NVarChar).Value = this.Title;
                    cmd.Parameters.Add("@SUBTITLE", System.Data.SqlDbType.NVarChar).Value = this.Subtitle;
                    cmd.Parameters.Add("@WIDGET_DATA", System.Data.SqlDbType.NVarChar).Value = this.WidgetData;
                    cmd.Parameters.Add("@WIDGET_TYPE_ID", System.Data.SqlDbType.Int).Value = this.WidgetTypeId;
                    cmd.Parameters.Add("@APPUSER_ID", System.Data.SqlDbType.Int).Value = this.AppuserId;
                    cmd.Parameters.Add("@WIDGET_DATE", System.Data.SqlDbType.NVarChar).Value = DateTime.Now;

                    if (cmd.ExecuteNonQuery() > 0)
                    {
                        success = true;
                        message = "Le widget a bien été créé";
                    }

                    else
                        message = "Le widget n'a pas pu être créé, recommence plus tard";

                }
                catch (Exception e)
                {
                    // TODO : écrire des logs
                    message = "Une erreur est survenue lors de l'enregistrement, ré-essaie plus tard.";
                }
                finally
                {
                    cn.Close();
                }
            }


            return new Response(success, message);
        }
    }
}
