import { useLocalSearchParams } from "expo-router";
import DisplayPostComponent from "@/components/DisplayPostComponent";

export default function PostScreen() {
  const { id } = useLocalSearchParams();
  return <DisplayPostComponent id={id as string} />;
}
