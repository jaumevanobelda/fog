import {Card,CardContent,CardHeader,CardTitle,} from "@/components/ui/card"
import {Tabs,TabsContent,TabsList,TabsTrigger,} from "@/components/ui/tabs"
import { useFriendRequests, useFriends } from "@/queries/auth/useUser"
import { UserIcon, UserPlusIcon } from "lucide-react"
import FriendList from "./FriendList";
import FriendRequests from "./FriendRequests";

export function Friends() {
    return (
        <Tabs defaultValue="friendlist">
            <TabsList>
                <TabsTrigger value="friendlist"><UserIcon /> </TabsTrigger>
                <TabsTrigger value="friendRequest"><UserPlusIcon /> </TabsTrigger>
            </TabsList>
            <TabsContent value="friendlist">
                <Card>
                    <CardHeader>
                        <CardTitle>Amigos</CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground text-sm">
                        <FriendList/>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="friendRequest">
                <Card>
                    <CardHeader>
                        <CardTitle>Solicitudes de amistad</CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground text-sm">
                        <FriendRequests/>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
