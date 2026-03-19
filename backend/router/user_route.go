package router

import (
	"backend/handler"

	"github.com/gofiber/fiber/v3"
)

func NewUserRoute(app *fiber.App, userHandler handler.UserHandlerInterface) {
	user := app.Group("/api/users")
	user.Get("/", userHandler.GetUser)
	user.Post("/", userHandler.CreateUser)
}
