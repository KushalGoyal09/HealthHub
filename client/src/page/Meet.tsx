import { useNavigate, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { tokenAtom, userAtom } from "@/recoil/authAtom";
import { toast } from "@/components/ui/use-toast";
import NotFound from "./NotFound";
import axios, { AxiosResponse } from "axios";
import Loading from "@/components/Loading";

interface MeetResponse {
    success: boolean;
    valid: boolean;
}

interface MeetReq {
    currentDate: Date;
}

const Meet = () => {
    const { meetId } = useParams();
    const token = useRecoilValue(tokenAtom);
    const user = useRecoilValue(userAtom);
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState<null | boolean>(null);
    if (!meetId) {
        return <NotFound />;
    }
    const isMeetValid = async (meetId: string) => {
        try {
            const { data } = await axios.post<
                MeetResponse,
                AxiosResponse<MeetResponse>,
                MeetReq
            >(
                `/api/meet/${meetId}`,
                {
                    currentDate: new Date(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (data.valid === false) {
                navigate("/");
                toast({
                    title: "You are not authorized to access the meeting",
                    variant: "destructive",
                });
                setIsValid(false);
            } else {
                setIsValid(true);
            }
        } catch (error) {
            navigate("/");
            toast({
                title: "No Meeting found as such",
                variant: "destructive",
            });
        }
    };

    useEffect(() => {
        isMeetValid(meetId);
    }, []);

    const myMeeting = async (element: HTMLDivElement) => {
        if (!user || !meetId) {
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
            {isValid === null && <Loading />}
            {isValid === true && (
                <div
                    ref={myMeeting}
                    style={{ width: "100vw", height: "100vh" }}
                ></div>
            )}
        </>
    );
};

export default Meet;
