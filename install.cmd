set EXEC_DIR=%CD%
set BACKEND_DIR=%EXEC_DIR%\mon-shelter
set FRONTEND_DIR=%EXEC_DIR%\mon-front

:RunMvw
cd %BACKEND_DIR%
call mvnw.cmd clean install
call start cmd /C mvnw.cmd spring-boot:run 
goto SecondPart

:SecondPart
cd %FRONTEND_DIR%
call npm install
call npm start