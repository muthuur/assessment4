CREATE OR ALTER PROCEDURE getNote(
    @id VARCHAR(255)
)
AS
BEGIN
    SELECT * FROM notes WHERE id = @id;
END;