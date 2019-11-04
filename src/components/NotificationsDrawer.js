import React from "react";
import NotificationCard from './NotificationCard';
import NotificationDB from './NotificationDb';
import Drawer from '@material-ui/core/Drawer';
import { Context } from '../context';
import styled from "styled-components";

const NoTransactionsText = styled.div`
    padding: 2%
`;


class NotificationsDrawer extends React.Component {
    render() {
        return(
            <Drawer anchor="right" open={this.context.notificationDrawerOpen} onClose={this.context.closeNotificationsDrawer}>
                {this.context.logs == 0 && <NoTransactionsText> No transactions to track yet </NoTransactionsText>}
                {this.context.logs.map((log, index) => (
                    <NotificationDB key={index} log={log} />
                ))}
                {/* {this.context.transactions.map((tx, index) => (
                    <NotificationCard key={index} tx={tx} />
                ))} */}
            </Drawer>
        )
    }
}

NotificationsDrawer.contextType = Context;

export default NotificationsDrawer;