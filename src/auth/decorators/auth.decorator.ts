import { applyDecorators, UseGuards } from "@nestjs/common";
import { Rol } from "../../common/enums/rol.enum";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";
import { Roles } from "./roles.decorator";

export function AuthDecorator(rol: Rol[]) {
    return applyDecorators(
        UseGuards(AuthGuard, RolesGuard),
        Roles(rol),
    )
}