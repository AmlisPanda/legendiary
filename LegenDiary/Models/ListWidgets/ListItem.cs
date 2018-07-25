using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace LegenDiary.Models.ListWidgets
{
    [DataContract]
    public class ListItem
    {
        [DataMember]
        public int ListItemId { get; set; }
        [DataMember]
        public int WidgetId { get; set; }
        [DataMember]
        public string Label { get; set; }
        [DataMember]
        public bool Done { get; set; }
        [DataMember]
        public int Order { get; set; }
        [DataMember]
        public byte Note { get; set; }


        public ListItemResponse Save(IConfiguration config)
        {
            bool success = false;
            string message = string.Empty;
            int id = 0; // TODO si besoin

            using (SqlConnection cn = new SqlConnection(config.GetConnectionString("AppDbContext")))
            {
                try
                {
                    cn.Open();

                    SqlCommand cmd = new SqlCommand();
                    cmd.Connection = cn;

                    if (this.ListItemId > 0)
                    {
                        cmd.CommandText = @"UPDATE [LISTITEM] SET LABEL = @LABEL, ITEM_ORDER = @ITEM_ORDER, NOTE = @NOTE, DONE = @DONE WHERE LISTITEM_ID = @ID; SELECT @ID; ";
                        cmd.Parameters.Add("@ID", System.Data.SqlDbType.Int).Value = this.ListItemId;
                    }
                    else
                    {
                        cmd.CommandText = @"INSERT INTO [LISTITEM] (WIDGET_ID, LABEL, ITEM_ORDER, NOTE, DONE) 
                                        VALUES (@WIDGET_ID, @LABEL, @ITEM_ORDER, @NOTE, @DONE); SELECT CAST(SCOPE_IDENTITY() AS INT); ";
                        cmd.Parameters.Add("@WIDGET_ID", System.Data.SqlDbType.Int).Value = this.WidgetId;
                    }

                    cmd.Parameters.Add("@LABEL", System.Data.SqlDbType.NVarChar).Value = this.Label;
                    cmd.Parameters.Add("@ITEM_ORDER", System.Data.SqlDbType.Int).Value = this.Order;
                    cmd.Parameters.Add("@NOTE", System.Data.SqlDbType.TinyInt).Value = this.Note;
                    cmd.Parameters.Add("@DONE", System.Data.SqlDbType.Bit).Value = this.Done;

                    id = (int)cmd.ExecuteScalar();
                    if (id > 0)
                    {
                        success = true;
                        message = "L'item a été sauvegardé";
                    }

                    else
                        message = "L'item n'a pas pas pu être sauvegardé, recommence plus tard";

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


            return new ListItemResponse(success, message) { ListItemId = id };
        }


    }
}
