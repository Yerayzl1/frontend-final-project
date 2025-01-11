export async function ProfessionalsData() {
  const headers = {
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  };
  const errors = [];

  try {
    const [todayResponse, weekResponse, monthResponse, yearResponse, professionalsResponse, reportsResponse] = await Promise.all([
      fetch("http://localhost:8000/api/professionals/today/count", { headers }),
      fetch("http://localhost:8000/api/professionals/week/count", { headers }),
      fetch("http://localhost:8000/api/professionals/month/count", { headers }),
      fetch("http://localhost:8000/api/professionals/year/count", { headers }),
      fetch("http://localhost:8000/api/professionals/professional-status", { headers }),
      fetch("http://localhost:8000/api/professionals/reports", { headers }),
    ]);

    if(!todayResponse.ok) {
      errors.push(await todayResponse.json());
    }


    if(!weekResponse.ok) {
      errors.push(await weekResponse.json());
    }

    if(!monthResponse.ok) {
      errors.push(await monthResponse.json());
    }

    if(!yearResponse.ok) {
      errors.push(await yearResponse.json());
    }

    if(!professionalsResponse.ok) {
      errors.push(await professionalsResponse.json());
    }

    if(!reportsResponse.ok) {
      errors.push(await reportsResponse.json());
    }

    const [todayData, weekData, monthData, yearData, professionalsData, reportsData] = await Promise.all([
      todayResponse.json(),
      weekResponse.json(),
      monthResponse.json(),
      yearResponse.json(),
      professionalsResponse.json(),
      reportsResponse.json(),
    ]);

    return {
      appointmentsToday: todayData.count,
      appointmentsWeek: weekData.count,
      appointmentsMonth: monthData.count,
      appointmentsYear: yearData.count,
      professionals: professionalsData.professionals,
      reports: reportsData,
    };
  } catch (err) {
    console.error("Error fetching professionals data:", err);
    return {
      appointmentsToday: 0,
      appointmentsWeek: 0,
      appointmentsMonth: 0,
      appointmentsYear: 0,
      professionals: [],
      reports: [],
    };
  }
}
