import React from "react";
import NotificationCard from './NotificationCard';
import Drawer from '@material-ui/core/Drawer';
import { Context } from '../context';



class NotificationsDrawer extends React.Component {
    render() {
        return(
            <Drawer anchor="right" open={this.context.notificationDrawerOpen} onClose={this.context.closeNotificationsDrawer}>
                {this.context.transactions.map((tx, index) => (
                    <NotificationCard key={index} tx={tx} />
                ))}
                
            </Drawer>
        )
    }
}

NotificationsDrawer.contextType = Context;

export default NotificationsDrawer;