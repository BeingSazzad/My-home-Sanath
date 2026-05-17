import UserNotifications from '@/components/UserDashboard/UserNotifications'

export const metadata = {
  title: "Notifications | Agent Dashboard",
  description: "View your agency notifications and alerts.",
};

const AgentNotificationsPage = () => {
    return (
        <div>
            <UserNotifications />
        </div>
    )
}

export default AgentNotificationsPage;
