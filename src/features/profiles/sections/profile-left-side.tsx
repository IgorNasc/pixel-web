import ProfilePaymentHistory from "@/features/profiles/components/profile-payment-history";
import ProfilePlanDetails from "@/features/profiles/components/profile-plan-details";

export default function ProfileLeftSide() {
    return (
        <div className="space-y-6">
            <ProfilePlanDetails />
            <ProfilePaymentHistory />
        </div>
    )
}