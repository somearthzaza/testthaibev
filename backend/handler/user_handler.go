package handler

import (
	"backend/model"
	"backend/service"

	"github.com/gofiber/fiber/v3"
)

type UserHandler struct {
	userService service.UserSerivceInterface
}

type UserHandlerInterface interface {
	GetUser(fiber.Ctx) error
	CreateUser(fiber.Ctx) error
}

func NewUserHandler(userService service.UserSerivceInterface) UserHandlerInterface {
	return &UserHandler{
		userService: userService,
	}
}

func (s *UserHandler) GetUser(ctx fiber.Ctx) error {
	users, err := s.userService.GetAll()
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": 500, "msg": "เกิดข้อผิดพลาดไม่ทรายสาเหตุ"})
	}
	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{"status": 200, "data": users})
}

func (s *UserHandler) CreateUser(ctx fiber.Ctx) error {
	var user model.User

	if err := ctx.Bind().Body(&user); err != nil {
		return ctx.Status(fiber.ErrBadRequest.Code).JSON(fiber.Map{"status": 400, "msg": err.Error()})
	}
	err := s.userService.Create(user)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": 500, "msg": err})
	}
	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{"status": 200, "msg": "สำเร็จ"})
}
