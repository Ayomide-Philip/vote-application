export default function PrintTemplate({ poll }) {
  const formattedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Calculate statistics
  const totalParticipants = poll.voters ? poll.voters.length : 0;
  const totalVotesCast = poll.contestants
    ? poll.contestants.reduce((sum, position) => {
        const positionVotes = position.candidates
          ? position.candidates.reduce(
              (pSum, candidate) => pSum + (candidate.votes || 0),
              0,
            )
          : 0;
        return sum + positionVotes;
      }, 0)
    : 0;
  const didNotVote = totalParticipants - totalVotesCast;
  const turnoutPercentage =
    totalParticipants > 0
      ? ((totalVotesCast / totalParticipants) * 100).toFixed(2)
      : 0;

  return (
    <div className="print-template">
      <style jsx>{`
        .print-template {
          display: none;
        }

        @media print {
          .print-template {
            display: block;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          }

          * {
            margin: 0;
            padding: 0;
          }

          body {
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            background: white;
            color: #1f2937;
          }

          .print-header {
            text-align: center;
            background: #1f2937;
            color: white;
            padding: 40px 20px;
            margin-bottom: 40px;
            border-radius: 0;
            page-break-inside: avoid;
          }

          .print-header h1 {
            font-size: 32pt;
            font-weight: 700;
            margin-bottom: 15px;
            letter-spacing: -0.5px;
          }

          .print-meta {
            font-size: 12pt;
            opacity: 0.95;
            margin-bottom: 5px;
          }

          .print-meta p {
            margin: 3px 0;
          }

          .print-content {
            margin-bottom: 30px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            page-break-inside: avoid;
            margin-bottom: 30px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }

          th {
            background: #374151;
            color: white;
            border: 1px solid #374151;
            padding: 14px 12px;
            text-align: left;
            font-weight: 600;
            font-size: 12pt;
            letter-spacing: 0.3px;
          }

          td {
            border: 1px solid #e5e7eb;
            padding: 12px 12px;
            font-size: 11pt;
            color: #374151;
          }

          tbody tr:nth-child(odd) {
            background: #f9fafb;
          }

          tbody tr:nth-child(even) {
            background: #ffffff;
          }

          tbody tr:hover {
            background: #f3f4f6;
          }

          .position-section {
            page-break-inside: avoid;
            margin-bottom: 35px;
            padding: 0 0 20px 0;
            border-bottom: 2px solid #e5e7eb;
          }

          .position-section:last-child {
            border-bottom: none;
          }

          .position-title {
            font-size: 18pt;
            font-weight: 700;
            margin-bottom: 15px;
            color: #1f2937;
            border-left: 5px solid #6b7280;
            padding-left: 15px;
            text-transform: capitalize;
            letter-spacing: 0.5px;
          }

          .print-footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
            font-size: 10pt;
            text-align: center;
            color: #6b7280;
          }

          .print-summary {
            background: #f3f4f6;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 40px;
            page-break-inside: avoid;
          }

          .summary-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }

          .summary-item {
            text-align: center;
          }

          .summary-label {
            font-size: 10pt;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
            font-weight: 600;
          }

          .summary-value {
            font-size: 24pt;
            font-weight: 700;
            color: #1f2937;
          }

          .summary-subtext {
            font-size: 9pt;
            color: #9ca3af;
            margin-top: 4px;
          }

          .progress-bar {
            display: none;
          }

          .hidden-ui {
            display: none !important;
          }

          /* Page styling */
          @page {
            margin: 15mm;
            size: A4;
          }

          /* Ensure no unwanted page breaks */
          p,
          h1,
          h2,
          h3 {
            page-break-after: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>

      <div className="print-header">
        <h1>{poll.title || "Election Results"}</h1>
        <div className="print-meta">
          <p>Generated on {formattedDate}</p>
          <p>Results Report</p>
        </div>
      </div>

      <div className="print-summary">
        <div className="summary-grid">
          <div className="summary-item">
            <div className="summary-label">Total Participants</div>
            <div className="summary-value">{totalParticipants}</div>
          </div>
          <div className="summary-item">
            <div className="summary-label">Total Votes Cast</div>
            <div className="summary-value">{totalVotesCast}</div>
          </div>
          <div className="summary-item">
            <div className="summary-label">Did Not Vote</div>
            <div className="summary-value">{didNotVote}</div>
          </div>
          <div className="summary-item">
            <div className="summary-label">Turnout %</div>
            <div className="summary-value">{turnoutPercentage}%</div>
          </div>
        </div>
      </div>

      <div className="print-content">
        {poll.contestants && poll.contestants.length > 0 ? (
          poll.contestants.map((position) => (
            <div key={position._id} className="position-section">
              <div className="position-title">{position.position}</div>
              <table>
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th style={{ width: "100px" }}>Votes</th>
                    <th style={{ width: "100px" }}>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {position.candidates && position.candidates.length > 0 ? (
                    position.candidates.map((candidate) => {
                      const totalVotes = position.candidates.reduce(
                        (sum, c) => sum + (c.votes || 0),
                        0,
                      );
                      const percentage =
                        totalVotes > 0
                          ? (
                              ((candidate.votes || 0) / totalVotes) *
                              100
                            ).toFixed(2)
                          : 0;

                      return (
                        <tr key={candidate._id}>
                          <td>{candidate.name}</td>
                          <td style={{ textAlign: "center" }}>
                            {candidate.votes || 0}
                          </td>
                          <td style={{ textAlign: "center" }}>{percentage}%</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        No candidates
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <p>No position data available</p>
        )}
      </div>

      <div className="print-footer">
        <p>This is an official election results document.</p>
      </div>
    </div>
  );
}
