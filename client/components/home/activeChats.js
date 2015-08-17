var ActiveChatsMessagesSubs = new SubsManager();
var ActiveChatsSubs = new SubsManager();
Template.activeChats.onCreated(function () {
    var self = this;

    // Subscription
    self.ready = new ReactiveVar();
    self.autorun(function () {
        var handle = ActiveChatsMessagesSubs.subscribe(
            'messages');
        ActiveChatsSubs.subscribe('activeChats');
        self.subscribe('principals');
        self.ready.set(handle.ready());
    });
});

Template.activeChats.helpers({
    ready: function () {
        return Template.instance().ready.get();
    },
    activeChats: function () {
        // check the recent messages of the user
        var messages = Messages.find({
            author: Meteor.userId()
        }).fetch();
        groupedMessages = _.groupBy(messages, 'chatPartner');
        var resultMessages = [];
        _.each(groupedMessages, function (messages) {
            resultMessages.push(messages[messages.length -
                1]);
        });
        return resultMessages;
    },
    message: function () {
        var message = Messages.findOne({
            _id: this._id
        });
        return message;
    }
});

Template.activeChatsListItem.helpers({
    user: function () {
        return Meteor.users.findOne({
            _id: this.chatPartner
        });
    },
    email: function () {
        return this.emails[0].address;
    },
    gravatar: function () {
        var options = {
            secure: true
        };
        var md5Hash = Gravatar.hash(this.emails[0].address);
        return Gravatar.imageUrl(md5Hash, options);
    }
});

Template.activeChatsListItem.events({
    'click': function() {
        FlowRouter.go('/chat/:chatPartnerId', {
            chatPartnerId: this.chatPartner
        });
    }
});
