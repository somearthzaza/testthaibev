package main

import (
	"backend/database"
	"backend/handler"
	"backend/repository"
	"backend/router"
	"backend/service"
	"fmt"
	"os"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
	"github.com/joho/godotenv"

	"github.com/gofiber/fiber/v3/middleware/logger"
)

func main() {
	godotenv.Load()

	app := fiber.New()

	app.Use(cors.New())
	app.Use(logger.New())
	fmt.Println("Starting server...")
	databaseInit, err := database.InitDB()
	if err != nil {
		fmt.Print(err)
	}

	userRepo := repository.NewUserRepo(databaseInit)
	userService := service.NewUserService(userRepo)
	userHandler := handler.NewUserHandler(userService)

	router.NewUserRoute(app, userHandler)

	port := os.Getenv("APP_PORT")
	if port == "" {
		port = "4000"
	}

	app.Listen(":" + port)
}
