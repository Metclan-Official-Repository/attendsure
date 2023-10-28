const addBusinessQuery = (
  businessName,
  ownerId,
  currentPlan,
  createdAt,
  updatedAt
) => {
  return `
        INSERT INTO businesses(business_name, owner_id, current_plan, created_at, updated_at)
        VALUES("${businessName}", ${ownerId}, "${currentPlan}", ${createdAt}, ${updatedAt});
    `;
};
const fetchBusinessPlan = (businessId) => {
  return `
    SELECT businesses.current_plan 
    FROM businesses 
    WHERE id = ${parseInt(businessId)};
  `;
};
module.exports = { addBusinessQuery, fetchBusinessPlan };
