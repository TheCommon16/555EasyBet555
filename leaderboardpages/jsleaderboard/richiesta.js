$(document).ready(function () {
    richiestadati();
});

function richiestadati() {
    $.ajax({
        url: "http://192.168.1.1:3000/leaderboardmoney",
        type: "POST",
        success: function (result) {
            const tbody = document.getElementById("moneyleaderboard");
            console.log(result.tabella);

            
            tbody.innerHTML = "<tr><th id='TitleTablle'>Most Goldì</th></tr>";
            posizione = 0;
            result.tabella.forEach(item => {
                posizione = posizione + 1;
                const tr = document.createElement("tr");

                const td = document.createElement("td");
                td.innerHTML = `
                    <div class="user-entry">
                        <div class="posizione">${posizione}</div>
                        <div class="username">${item.username}</div>
                        <div class="money">${item.money} €</div>
                    </div>
                `;

                tr.appendChild(td);
                tbody.appendChild(tr);
            });
        }
    });
}