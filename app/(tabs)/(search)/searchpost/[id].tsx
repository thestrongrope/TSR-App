import { useLocalSearchParams } from "expo-router";
import DisplayPostComponent from "components/DisplayPostComponent";

export default function SearchPostScreen() {
  const { id }: { id: string } = useLocalSearchParams();
  return <DisplayPostComponent id={id} />;
}
