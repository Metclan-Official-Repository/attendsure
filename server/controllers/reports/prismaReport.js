const { PrismaClient } = require("@prisma/client");
const { addDays } = require("date-fns");
const prisma = new PrismaClient();
const convertDateToTime = (date) => {
  if (date === undefined) {
    return undefined;
  }
  const getDate = new Date(date);
  const getTime = getDate.getTime();
  const timeInSeconds = getTime / 1000;
  return timeInSeconds;
};
const attendanceSummary = async (req, res) => {
  const businessId = req.businessId;
  const { currentPage, departmentId, shiftId, employeeId, from, to } =
    req.query;
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
      check_in: {
        gte: convertDateToTime(from)
          ? convertDateToTime(from)
          : addDays(new Date(), -30).getTime() / 1000,
      },
      check_out: {
        lte: convertDateToTime(to)
          ? convertDateToTime(to)
          : new Date().getTime() / 1000,
      },
      business_id: parseInt(businessId),
    };

    const summary = await prisma.attendance.findMany({
      where: filters,
      skip: parseInt(currentPage) > 1 ? (parseInt(currentPage) - 1) * 10 : 0,
      take: 10,
      orderBy: { check_in: "desc" },
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

const summary = (req, res) => {};
module.exports = { attendanceSummary };
