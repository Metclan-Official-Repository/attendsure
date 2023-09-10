const addBusinessQuery = (
  businessName,
  ownerId,
  currentPlan,
  createdAt,
  updatedAt
) => {
  return `
        INSERT INTO businesses(business_name, owner_id, current_plan, created_at, updated_at)
        VALUES('${businessName}', ${ownerId}, '${currentPlan}', ${createdAt}, ${updatedAt});
    `;
};
module.exports = { addBusinessQuery };
