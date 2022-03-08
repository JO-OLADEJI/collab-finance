const Group = require('../models/group.js');
const User = require('../models/user.js');
const { validateGroup } = require('../utils/validate.js');


class GroupController {

  search = async (req, res) => {
    // find groups that are searchable from query string parameters
    // return results to user
    res.send('searching for a group . . .');
  }


  create = async (req, res) => {
    try {
      // check if user exists
      const groupAdmin = await User.findById(req.query.admin);
      if (!groupAdmin) return res.status(404).json({
        'success': false,
        'result': null,
        'error': 'User with the given ID was not found ❗'
      });

      // organize the input
      const proposedGroup = { ...req.body };
      proposedGroup['admin'] = groupAdmin['_id'].toString();
      proposedGroup['members'] = [];
      proposedGroup['members'].push(groupAdmin._id);
      proposedGroup['startDate'] = new Date(req.body.startDate);

      // validate the group
      const { value, error } = validateGroup(proposedGroup);
      if (error) return res.status(400).json({
        'success': false,
        'result': null,
        'error': error['details'][0]['message']
      });

      // save to db
      const groupObj = new Group({ ...proposedGroup });
      const group = await groupObj.save();

      res.json({
        'success': true,
        'result': group,
        'error': null
      });
    }
    catch (exc) {
      res.json({
        'success': false,
        'result': null,
        'error': exc.message
      });
    }
  }


  join = async (req, res) => {
    // // check if group exists
    // const requestedGroup = await Group.findById(req.query.groupId);
    // if (!requestedGroup) return res.status(404).json({
    //   'success': false,
    //   'result': null,
    //   'error': 'Group with the given ID was not found ❗'
    // });

    // res.send(requestedGroup);
    // // append to the list of members in a group
    res.send('adding member with given ID to a group . . .');
  }


  sendInvite = async (req, res) => {
    // check if member exists
    // send out invite to the user
    res.send('sending invite to member with given ID . . .');
  }

}


const groupController = new GroupController();
module.exports = groupController;