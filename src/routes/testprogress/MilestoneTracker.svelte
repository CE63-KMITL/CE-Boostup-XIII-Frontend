<script lang="ts">
  export let currentUser = { name: "", studentID: "", points: 0, redeemed: [] };
  export let milestones = [];

  $: currentIndex = milestones.findIndex((m) => currentUser.points < m.points); //รางวัลถัดไป
  $: previousMilestone = milestones[currentIndex - 1] ?? { points: 0 }; //รางวัลก่อนหน้า
  $: nextMilestone = milestones[currentIndex] ?? null; //รางวัลถัดไป

  $: milestoneProgress = nextMilestone //คำนวนเปอร์เซ็นต์
    ? ((currentUser.points - previousMilestone.points) /
        (nextMilestone.points - previousMilestone.points)) *
      100
    : 100;

  // แสดงรูปถ้วยเมื่อผ่าน ได้รางวัลครบแล้ว
  $: currentRewardImage =
    !nextMilestone || currentUser.points >= nextMilestone.points
      ? "src/routes/testprogress/thophy.jpg"
      : nextMilestone?.image;
  function getRewardStatus(milestone) {
    if (currentUser.redeemed.includes(milestone.id)) {
      return {
        status: "redeemed",
        text: "รับแล้ว",
        colorClass: "status-redeemed",
      };
    } else if (currentUser.points >= milestone.points) {
      return {
        status: "available",
        text: "พร้อมรับ",
        colorClass: "status-available",
      };
    } else {
      const pointsNeeded = milestone.points - currentUser.points;
      return {
        status: "locked",
        text: `ขาดอีก ${pointsNeeded} แต้ม`,
        colorClass: "status-locked",
      };
    }
  }
</script>

<div class="milestone-container">
  <div class="progress-container">
    <div class="circle">
      <img src={currentRewardImage} alt="" class="reward-image" />
    </div>

    <div class="bar">
      <div class="fill" style="width: {milestoneProgress}%"></div>
      <div class="text">
        {currentUser.points}/{nextMilestone?.points ?? "MAX"}
      </div>
    </div>
    <div class="level">{Math.floor(milestoneProgress)}%</div>
  </div>

  <div class="rewards-container">
    <h3>รางวัลสะสม</h3>
    <div class="rewards-list">
      {#each milestones as milestone}
        {@const status = getRewardStatus(milestone)}
        <div class="reward-item {status.colorClass}">
          <img src={milestone.image} alt="" class="reward-icon-small" />
          <div class="reward-info">
            <div class="reward-name">{milestone.reward}</div>
            <div class="reward-points">{milestone.points} Points</div>
          </div>
          <div class="reward-status">
            <span class="status">{status.text}</span>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .reward-image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 4px solid #ccc;
    object-fit: cover;
  }

  .progress-container {
    text-align: center;

    .circle {
      position: relative;
      width: 100px;
      height: 100px;
      margin: auto;
      border-radius: 50%;
      background: var(--bg);
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .bar {
      margin-top: 1rem;
      height: 20px;
      max-width: 300px;
      margin-inline: auto;
      background: #ddd;
      border-radius: 10px;
      position: relative;
      overflow: hidden;
      .fill {
        height: 100%;
        background: linear-gradient(to right, #43e97b 0%, #38f9d7 100%);
      }

      .text {
        position: absolute;
        top: 0;
        width: 100%;
        text-align: center;
        font-size: 0.8rem;
      }
    }
  }
  .milestone-container {
    background-color: var(--bg);
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    max-width: 100%;
  }
  .rewards-container {
    h3 {
      margin-top: 10px;
      margin-bottom: 10px;
      color: #3a86ff;
      text-align: center;
    }

    .rewards-list {
      max-height: 300px;
      overflow-y: auto;
      padding-right: 5px;

      /* Scrollbar styling */
      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-track {
        background: #f0f2f5;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb {
        background: #bdc3c7;
        border-radius: 10px;

        &:hover {
          background: #95a5a6;
        }
      }
    }
  }

  .reward-item {
    display: flex;
    align-items: center;
    background-color: var(--list-bg);
    margin-bottom: 10px;
    padding: 12px;
    border-radius: 8px;
    transition: all 0.2s ease;
    box-shadow: 0 2px 5px var(--list-shadow-5);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px var(--list-shadow-10);
    }

    .reward-icon-small {
      margin-right: 12px;
      width: 40px;
      height: 40px;
      border-radius: 8px;
    }

    .reward-info {
      flex-grow: 1;

      .reward-name {
        font-weight: bold;
        color: var(--text);
      }

      .reward-points {
        font-size: 12px;
        color: #3a86ff;
      }
    }

    .reward-status {
      .status {
        font-size: 12px;
        font-weight: bold;
      }
    }
  }

  /* Status color classes */
  .status-redeemed {
    border-left: 4px solid var(--status-done);

    .status {
      color: var(--status-done);
    }
  }

  .status-available {
    border-left: 4px solid #3a86ff;

    .status {
      color: #3a86ff;
    }
  }

  .status-locked {
    border-left: 4px solid var(--status-not-started);
    opacity: 0.8;

    .status {
      color: var(--status-not-started);
    }
  }

  /* Responsive styles */
  @media (max-width: 600px) {
    .reward-item {
      flex-direction: column;
      align-items: flex-start;

      .reward-icon-small {
        margin-bottom: 10px;
      }

      .reward-info {
        margin-bottom: 10px;
        width: 100%;
      }

      .reward-status {
        width: 100%;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>
