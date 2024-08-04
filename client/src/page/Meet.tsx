import { redirect, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/authAtom";
import { toast } from "@/components/ui/use-toast";

const Meet = () => {
    const { meetId } = useParams();
    const user = useRecoilValue(userAtom);

    useEffect(() => {
        if (!user) {
            toast({
                title: "You need to login first",
            });
            redirect("/");
            return;
        }
        if (user.role !== "DOCTOR" && user.role !== "PATIENT") {
            toast({
                title: "You need to register as Doctor or Patient",
            });
            redirect("/");
            return;
        }
    },[]);

    const myMeeting = async (element: HTMLDivElement) => {
        if (!user || !meetId) {
            return;
        }
        if (user.role !== "DOCTOR" && user.role !== "PATIENT") {
            return;
        }
        const appID = import.meta.env.VITE_ZEGO_APP_ID;
        const serverSecret = import.meta.env.VITE_ZEGO_serverSecret;
        const role = user.role;
        const name = `${user.name} (${role})`;
        const userId = user.email;
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            Number(appID),
            serverSecret,
            meetId,
            userId,
            name
        );
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: element,
            maxUsers: 2,
            showRoomTimer: true,
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            onJoinRoom: () => {
                console.log("Join Room Success");
            },
        });
    };

    return (
        <>
            <div
                ref={myMeeting}
                style={{ width: "100vw", height: "100vh" }}
            ></div>
        </>
    );
};

export default Meet;
