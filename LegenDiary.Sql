/*============================================================================*/
/* DBMS: MS Sql Server 2012*/
/* Created on : 23/03/2018 15:57:52                                           */
/*============================================================================*/


/*============================================================================*/
/*                                  TABLES                                    */
/*============================================================================*/
CREATE TABLE [APPUSER] (
  [APPUSER_ID]               INT NOT NULL IDENTITY(1,1),
  [APPUSER_LOGIN]            NVARCHAR(200) NOT NULL,
  [EMAIL]                    NVARCHAR(200) NOT NULL,
  [ENCRYPTED_PASSWORD]       NVARCHAR(500) NOT NULL,
  [SUBSCRIPTION_DATE]        DATETIMEOFFSET,
  [LAST_CONNECTION]          DATETIMEOFFSET,
CONSTRAINT [PK_APPUSER] PRIMARY KEY ([APPUSER_ID])
)
GO

CREATE TABLE [WIDGET] (
  [WIDGET_ID]            INT NOT NULL IDENTITY(1,1),
  [WIDGET_DATE]          DATETIMEOFFSET,
  [TITLE]                VARCHAR(500) NOT NULL,
  [SUBTITLE]             VARCHAR(500),
  [IS_FAVOURITE]         BIT,
  [WIDGET_DATA]          NVARCHAR(4000),
  [WIDGET_TYPE_ID]       INT NOT NULL,
  [APPUSER_ID]           INT NOT NULL,
  [WIDTH]				 INT,
  [HEIGHT]				 INT,
  [X]				 	 INT,
  [Y]				 	 INT,
CONSTRAINT [PK_WIDGET] PRIMARY KEY ([WIDGET_ID])
)
GO

CREATE TABLE [dbo].[LISTITEM](
	[LISTITEM_ID] INT IDENTITY(1,1) NOT NULL,
	[WIDGET_ID] INT NOT NULL,
	[LABEL] NVARCHAR(500),
	[ITEM_ORDER] INT,
	[NOTE] TINYINT,
	[DONE] BIT,
	
 CONSTRAINT [PK_LISTITEM] PRIMARY KEY ([LISTITEM_ID])
)
GO

/*
CREATE TABLE [WIDGET_TYPE] (
  [WIDGET_TYPE_ID]       INT NOT NULL IDENTITY(1,1),
  [LABEL]                NVARCHAR(150) NOT NULL,
CONSTRAINT [PK_WIDGET_TYPE] PRIMARY KEY ([WIDGET_TYPE_ID])
)
GO*/

/*============================================================================*/
/*                               FOREIGN KEYS                                 */
/*============================================================================*/
/*
ALTER TABLE [WIDGET]
    ADD CONSTRAINT [FK_WIDGET_WIDGET_TYPE]
        FOREIGN KEY ([WIDGET_TYPE_ID])
            REFERENCES [WIDGET_TYPE] ([WIDGET_TYPE_ID])
 GO
*/
ALTER TABLE [WIDGET]
    ADD CONSTRAINT [FK_WIDGET_APPUSER]
        FOREIGN KEY ([APPUSER_ID])
            REFERENCES [APPUSER] ([APPUSER_ID])
ON DELETE CASCADE
 GO
 
 ALTER TABLE [LISTITEM]
    ADD CONSTRAINT [FK_LISTITEM_WIDGET]
        FOREIGN KEY ([WIDGET_ID])
            REFERENCES [WIDGET] ([WIDGET_ID])
ON DELETE CASCADE
 GO



