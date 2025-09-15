const prisma = require('../prisma/prisma');

const updateMyProfile = async (req, res) => {
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
      return res.status(404).json({ success: false, error: "Staff profile is not found" });
    }
    res.status(500).json({ success: false, error: err.message });
  }
};

const prisma = require('../prisma/prisma');

const getStaffProfile = async(req, res)=>{ //requirement: 17
    try{
        const staffId = req.params.id;
        const staffWithInformation = await prisma.staff.findUnique({
            where: {
                userId: Number(staffId)
            },
            include:{
                user: {
                    select:{
                        firstname: true,
                        lastname: true,
                        email: true,
                        phone_number: true,
                        user_name: true,
                    }
                }
            }
        });
        if(!staffWithInformation) return res.status(404).json({success: false, error: "Staff is not found"});
        res.status(200).json({success: true, data: staffWithInformation});
    }catch(err){
        res.status(400).json({success: false, error: err.message});
    }
};

module.exports = {
    updateMyProfile,
    getStaffProfile
}