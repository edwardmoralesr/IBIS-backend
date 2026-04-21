import prisma from "../db/prisma.js";
import { dataTable } from "../utils/datatable/datatable.js";

export const getUsers = dataTable({
    model: prisma.rUsuario,
    searchFields: ["Nombre", "Documento", "Codigo"],
});