const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const attendanceSummary = async (req, res) => {
  const businessId = req.businessId;
  const { currentPage, departmentId, shiftId, employeeId } = req.query;
  try {
    const filters = {
      employees: {
        department_id: parseInt(departmentId)
          ? parseInt(departmentId)
          : { gt: parseInt(departmentId) },
        shift_id: parseInt(shiftId)
          ? parseInt(shiftId)
          : { gt: parseInt(shiftId) },
        id: parseInt(employeeId)
          ? parseInt(employeeId)
          : { gt: parseInt(employeeId) },
      },
      business_id: parseInt(businessId),
    };
    const summary = await prisma.attendance.findMany({
      where: filters,
      skip: parseInt(currentPage) > 1 ? (parseInt(currentPage) - 1) * 10 : 0,
      take: 10,
      orderBy: { check_out: "desc" },
      include: {
        employees: {
          select: {
            first_name: true,
            last_name: true,
            departments: { select: { name: true } },
            shifts: {
              select: { name: true, start_time: true, end_time: true },
            },
          },
        },
      },
    });
    const totalCount = await prisma.attendance.count({ where: filters });
    setTimeout(() => {
      res.status(200).json({ success: true, data: summary, count: totalCount });
    }, 2000);
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};
module.exports = { attendanceSummary };
