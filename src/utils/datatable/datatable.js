import { buildPagination } from "./pagination.js";
import { buildSearch } from "./search.js";

export const dataTable = ({
    model,
    searchFields = [],
    defaultWhere = {},
    include = undefined,
}) => {
    return async (req, res) => {
        const { page, pageSize, skip, take } = buildPagination(req.query);
        const search = req.query.search || "";

        const where = {
            ...defaultWhere,
            ...buildSearch(search, searchFields),
        };

        const [data, totalFiltered, totalOriginal] = await Promise.all([
            model.findMany({ where, skip, take, include }),
            model.count({ where }),
            model.count(),
        ]);

        res.json({ data, total: totalFiltered, totalOriginal, page, pageSize });
    };
};