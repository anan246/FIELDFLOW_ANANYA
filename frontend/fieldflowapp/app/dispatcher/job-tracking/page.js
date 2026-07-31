"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dispatcher/DashboardLayout";
import {
  MapPin,
  Search,
  UserCog,
  Clock3,
  CheckCircle2,
  Truck,
  ClipboardList,
  Eye,
} from "lucide-react";

export default function JobTrackingPage() {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedJob, setSelectedJob] = useState(null);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/dispatcher/job-tracking"
      );

      if (!response.ok) {
        throw new Error("Failed to load jobs");
      }

      const data = await response.json();

      setJobs(data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  const updateStatus = async (bookingId, status) => {

    try {

      const response = await fetch(
        `http://localhost:5000/api/dispatcher/job-status/${bookingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      loadJobs();

    } catch (err) {

      console.error(err);

      alert("Unable to update status.");

    }

  };

  const filteredJobs = jobs.filter((job) =>
    (
      job.customer_name +
      job.service_name +
      job.technician_name +
      job.status
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const assigned = jobs.filter(
  (job) => job.booking_status === "Assigned"
).length;

const travelling = jobs.filter(
  (job) => job.booking_status === "On the Way"
).length;

const started = jobs.filter(
  (job) => job.booking_status === "Started"
).length;

const completed = jobs.filter(
  (job) => job.booking_status === "Completed"
).length;
  const badgeColor = (status) => {

    switch (status) {

      case "Assigned":
        return "bg-orange-100 text-orange-600";

      case "On the Way":
        return "bg-blue-100 text-blue-600";

      case "Started":
        return "bg-purple-100 text-purple-600";

      case "Completed":
        return "bg-green-100 text-green-600";

      default:
        return "bg-gray-100 text-gray-600";

    }

  };

  return (
    <DashboardLayout>

  <div className="space-y-8">

    {/* Hero */}

    <section className="rounded-3xl bg-gradient-to-r from-[#08263B] via-[#10364F] to-[#08263B] p-8 text-white shadow-xl">

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Job Tracking
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-gray-300">
            Track technician progress, monitor active jobs and update
            service status in real time.
          </p>

        </div>

        <div className="rounded-2xl border border-white/20 bg-white/10 px-8 py-6 backdrop-blur">

          <p className="text-gray-300">
            Active Jobs
          </p>

          <h2 className="mt-2 text-5xl font-bold text-orange-400">
            {jobs.length}
          </h2>

        </div>

      </div>

    </section>

    {loading ? (

      <div className="rounded-3xl bg-white p-10 text-center shadow-md">

        Loading Job Tracking...

      </div>

    ) : (

      <>

        {/* Statistics */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-3xl bg-white p-6 shadow-md">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Assigned
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#08263B]">
                  {assigned}
                </h2>

              </div>

              <div className="rounded-2xl bg-orange-100 p-4">

                <ClipboardList className="text-orange-600" />

              </div>

            </div>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  On the Way
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#08263B]">
                  {travelling}
                </h2>

              </div>

              <div className="rounded-2xl bg-blue-100 p-4">

                <Truck className="text-blue-600" />

              </div>

            </div>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Started
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#08263B]">
                  {started}
                </h2>

              </div>

              <div className="rounded-2xl bg-purple-100 p-4">

                <Clock3 className="text-purple-600" />

              </div>

            </div>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Completed
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#08263B]">
                  {completed}
                </h2>

              </div>

              <div className="rounded-2xl bg-green-100 p-4">

                <CheckCircle2 className="text-green-600" />

              </div>

            </div>

          </div>

        </div>

        {/* Search */}

        <div className="rounded-3xl bg-white p-6 shadow-md">

          <div className="relative max-w-lg">

            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search booking, customer or technician..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-[#08263B]"
            />

          </div>

        </div>
                {/* Job List */}

        <div className="grid gap-6">

          {filteredJobs.length === 0 ? (

            <div className="rounded-3xl bg-white p-10 text-center shadow-md">

              <h2 className="text-2xl font-bold text-gray-700">
                No Jobs Found
              </h2>

              <p className="mt-2 text-gray-500">
                Try searching with another keyword.
              </p>

            </div>

          ) : (

            filteredJobs.map((job) => (

              <div
                key={job.booking_id}
                className="rounded-3xl bg-white p-6 shadow-md transition hover:shadow-xl"
              >

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                  <div className="space-y-4">

                    <div>

                      <h2 className="text-2xl font-bold text-[#08263B]">

                        {job.customer_name}

                      </h2>

                      <p className="text-gray-500">

                        Booking ID :
                        <span className="font-semibold">
                          {" "}
                          #{job.booking_id}
                        </span>

                      </p>

                    </div>

                    <div className="grid gap-3 md:grid-cols-2">

                      <div className="flex items-center gap-2">

                        <ClipboardList
                          size={18}
                          className="text-orange-500"
                        />

                        <span>{job.service_name}</span>

                      </div>

                      <div className="flex items-center gap-2">

                        <UserCog
                          size={18}
                          className="text-blue-600"
                        />

                        <span>{job.technician_name}</span>

                      </div>

                      <div className="flex items-center gap-2">

                        <MapPin
                          size={18}
                          className="text-red-500"
                        />

                        <span>{job.address}</span>

                      </div>

                      <div className="flex items-center gap-2">

                        <Clock3
                          size={18}
                          className="text-purple-500"
                        />

                        <span>{job.booking_time}</span>

                      </div>

                    </div>

                  </div>

                  <div className="flex flex-col items-end gap-4">

                    <span
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${badgeColor(
                        job.status
                      )}`}
                    >
                      {job.status}
                    </span>

                    <select
                      value={job.status}
                      onChange={(e) =>
                        updateStatus(
                          job.booking_id,
                          e.target.value
                        )
                      }
                      className="rounded-xl border border-gray-300 px-4 py-2"
                    >
                      <option>Assigned</option>
                      <option>On the Way</option>
                      <option>Started</option>
                      <option>Completed</option>
                    </select>

                    <button
                      onClick={() => {
                        setSelectedJob(job);
                        setShowModal(true);
                      }}
                      className="flex items-center gap-2 rounded-xl bg-[#08263B] px-5 py-3 text-white transition hover:bg-[#10364F]"
                    >
                      <Eye size={18} />

                      View Details

                    </button>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>
                {/* View Details Modal */}

        {showModal && selectedJob && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">

              <div className="mb-6 flex items-center justify-between">

                <h2 className="text-3xl font-bold text-[#08263B]">
                  Job Details
                </h2>

                <button
                  onClick={() => setShowModal(false)}
                  className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                  Close
                </button>

              </div>

              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <p className="text-sm text-gray-500">Booking ID</p>
                  <h3 className="font-semibold">
                    #{selectedJob.booking_id}
                  </h3>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <h3 className="font-semibold">
                    {selectedJob.customer_name}
                  </h3>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Technician</p>
                  <h3 className="font-semibold">
                    {selectedJob.technician_name}
                  </h3>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Service</p>
                  <h3 className="font-semibold">
                    {selectedJob.service_name}
                  </h3>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Status</p>

                  <span
                    className={`inline-block rounded-full px-4 py-2 text-sm font-semibold ${badgeColor(
                      selectedJob.booking_status
                    )}`}
                  >
                    {selectedJob.booking_status}
                  </span>

                </div>

                <div>
                  <p className="text-sm text-gray-500">Booking Time</p>
                  <h3 className="font-semibold">
                    {selectedJob.booking_time}
                  </h3>
                </div>

                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Address</p>
                  <h3 className="font-semibold">
                    {selectedJob.address}
                  </h3>
                </div>

                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Customer Phone</p>
                  <h3 className="font-semibold">
                    {selectedJob.customer_phone || "N/A"}
                  </h3>
                </div>

                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Notes</p>

                  <div className="mt-2 rounded-xl bg-gray-100 p-4">
                    {selectedJob.notes || "No notes available."}
                  </div>

                </div>

              </div>

            </div>

          </div>

        )}
              </>

    )}

  </div>

</DashboardLayout>

  );
}