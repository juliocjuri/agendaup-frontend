function Schedule(name, data, user, invitedEmails){
     this.name = name;
     this.data = data;
     this.user = user;
     this.invitedEmails = invitedEmails;
}

const schedules = [
     new Schedule(
          "Meeting with shareholders",
          Date.now(),
          "elonmusk@gmail.com",
          [
               "billgates@gmail.com",
               "melindagates@gmail.com",
               "adalovelace@gmail.com"
          ],
          true
     ),
     
     new Schedule(
          "Meeting to discuss technology stack of the company",
          Date.now(),
          "alberteinstein@gmail.com",
          [
               "isaacnewton@gmail.com",
               "pascal@gmail.com",
               "alessandrovolta@gmail.com"
          ],
          false
     ),
     
     new Schedule(
          "Meeting to discuss technology stack of the company",
          Date.now(),
          "alberteinstein@gmail.com",
          [
               "isaacnewton@gmail.com",
               "pascal@gmail.com",
               "alessandrovolta@gmail.com"
          ],
          false
     ),
     
     new Schedule(
          "Meeting to discuss technology stack of the company",
          Date.now(),
          "alberteinstein@gmail.com",
          [
               "isaacnewton@gmail.com",
               "pascal@gmail.com",
               "alessandrovolta@gmail.com"
          ],
          false
     ),
     
     new Schedule(
          "Meeting to discuss technology stack of the company",
          Date.now(),
          "alberteinstein@gmail.com",
          [
               "isaacnewton@gmail.com",
               "pascal@gmail.com",
               "alessandrovolta@gmail.com"
          ],
          false
     )
]

export default schedules;