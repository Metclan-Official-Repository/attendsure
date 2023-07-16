const addBusinessQuery = (businessName, ownerId, currentPlan, createdAt) => {
  return `
        INSERT INTO businesses(business_name, owner_id, current_plan, created_at)
        VALUES('${businessName}', ${ownerId}, '${currentPlan}', ${createdAt});
    `;
};
module.exports = { addBusinessQuery };
