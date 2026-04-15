// MOCK ENABLED
const USE_MOCK = true;

type ActivityStatus = "Recycled" | "Pending";

type MockActivity = {
  id: string;
  item: string;
  amount: number;
  status: ActivityStatus;
};

type CreateActivityPayload = {
  title: string;
  type: "scan" | "upload" | "manual";
  status: ActivityStatus;
  amount: number;
};

//mock store
let activities: MockActivity[] = [
  { id: "1", item: "Plastic Bottle", amount: 200, status: "Recycled" },
];

// GET DASHBOARD

export async function getDashboardData(_token: string) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    user: { name: "Chizaram" },
    stats: {
      totalEarnings: activities
        .filter((a) => a.status === "Recycled")
        .reduce((sum, a) => sum + a.amount, 0),
      itemsScanned: activities.length,
    },
    recentActivity: activities,
  };

  /*
   API DISABLED

  const res = await fetch("http://localhost:5000/api/dashboard", {
    headers: {
      Authorization: `Bearer ${_token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch dashboard data");
  return res.json();
  */
}

// CREATE ACTIVITY

export async function createActivity(
  _token: string,
  payload: CreateActivityPayload
) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const newActivity: MockActivity = {
    id: Date.now().toString(),
    item: payload.title,
    amount: payload.amount,
    status: payload.status,
  };

  activities = [newActivity, ...activities];
  return newActivity;

  /*
   API DISABLED

  const res = await fetch("http://localhost:5000/api/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${_token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to create activity");
  return res.json();
  */
}

// MARK AS RECYCLED
export async function markActivityAsRecycled(
  _token: string,
  id: string
) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  activities = activities.map((activity) =>
    activity.id === id
      ? { ...activity, status: "Recycled" }
      : activity
  );

  return activities.find((a) => a.id === id) ?? null;

  /*
   API DISABLED

  const res = await fetch(
    `http://localhost:5000/api/activities/${id}/recycle`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${_token}`,
      },
    }
  );

  if (!res.ok) throw new Error("Failed to update activity");
  return res.json();
  */
}