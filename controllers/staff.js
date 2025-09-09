const prisma = require('../prisma/prisma');

exports.updateMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const { firstname, lastname, email, phone_number, user_name, password, wages, bank_company, bank_account} = req.body;

    const result = await prisma.$transaction(async (tx) => {
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          firstname,
          lastname,
          email,
          phone_number,
          user_name,
          password,
        },
      });

      const updatedStaff = await tx.staff.update({
        where: { userId },
        data: {
            wages,
            bank_company,
            bank_account
         },
      });

      return { updatedUser, updatedStaff };
    });

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ success: false, error: "Staff profile not found" });
    }
    res.status(500).json({ success: false, error: err.message });
  }
};
