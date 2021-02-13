/* const assert = require('chai').assert;
var channelsDB = require('../db/channels');
var channelNamesArray = ['test channel 1', 'test channel 2', 'test channel 3'];


describe('Channels', function () {
  describe('#get()', function () {
    var channelIds = [];

    // Create 3 channels in DB
    before(function (done) {
      var numChannelsCreated = 0;
      channelNamesArray.forEach(function (channelName) {
        var channel = new channelsDB.Channel({name: channelName})
        channel.save(function (error, channel) {
          if (error) throw error;
          channelIds.push(channel._id);
          numChannelsCreated++;
          if (numChannelsCreated == channelNamesArray.length) {
            done();
          }
        })
      })
    })

    // remove the 3 channels created before
    after(function (done) {
      var numChannelsRemoved = 0;
      channelNamesArray.forEach(function (channelName) {
        channelsDB.getChannelByName(channelName, function (error, channel) {
          if (error) throw error;
          channel.remove(function () {
            numChannelsRemoved++;
            if (numChannelsRemoved == channelNamesArray.length) {
              done();
            }
          })
        })
      })
    })


    it('Should get all channels without error', function (done) {
      channelsDB.getChannels(function (error, channels) {
        assert.isAtLeast(channels.length, 3);
        done();
      })
    })


    it('Should get one channel by id without error', function (done) {
      channelsDB.getChannel(channelIds[0], function (error, channel) {
        assert.isNotNull(channel);
        done();
      })
    })
  })
})
 */