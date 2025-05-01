import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import Link from "next/link";

type TCourse = {
  id: string;
  title: string;
  description: string;
  level: string;
};

type TCoursesData = {
  courses: TCourse[];
};

const GET_ALL_COURSES = gql`
  query GetAllCourses {
    courses {
      id
      title
      description
      level
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery<TCoursesData>(GET_ALL_COURSES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Available Courses</h1>
      <ul>
        {data?.courses.map((course) => (
          <li key={course.id}>
            <Link href={`/courses/${course.id}`}>
              <h2>{course.title}</h2>
              <p>
                {course.description} (Level: {course.level})
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
